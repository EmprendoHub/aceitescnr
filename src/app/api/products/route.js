import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/backend/models/Product";
import APIFilters from "@/lib/APIFilters";
import Category from "@/backend/models/Category";

export const GET = async (request, res) => {
  const token = await request.headers.get("cookie");

  if (!token) {
    // Not Signed in
    const notAuthorized = "You are not authorized no no no";
    return new Response(JSON.stringify(notAuthorized), {
      status: 400,
    });
  }

  try {
    await dbConnect();
    let productQuery;
    productQuery = Product.find().populate("category");

    const resPerPage = Number(request.headers.get("perpage")) || 15;
    // Extract page and per_page from request URL
    const page = Number(request.nextUrl.searchParams.get("page")) || 1;
    productQuery = productQuery.sort({ createdAt: -1 });
    // total number of documents in database
    const productsCount = await Product.countDocuments();
    // Extract all possible categories
    const allCategoriesData = await Category.find({}); // Adjust field names as per your schema
    const productCategories = await Product.distinct("category");

    // Filter allCategoriesData to include only categories with IDs in productCategories
    let allCategories = allCategoriesData
      .filter((category) =>
        productCategories.some((id) => id.equals(category._id))
      )
      .map((category) => {
        return { id: category._id, name: category.name };
      });

    // Extract all possible categories
    const allBrands = await Product.distinct("brand");

    // Apply search Filters
    const apiProductFilters = new APIFilters(
      productQuery,
      request.nextUrl.searchParams
    )
      .searchAllFields()
      .filter();

    console.log(
      "apiProductFilters.query._conditions",
      apiProductFilters.query._conditions
    );

    let productsData = await apiProductFilters.query;

    const filteredProductsCount = productsData.length;

    apiProductFilters.pagination(resPerPage, page);
    productsData = await apiProductFilters.query.clone();

    const sortedProducts = productsData
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const products = {
      products: sortedProducts,
    };

    const dataPacket = {
      products,
      productsCount,
      filteredProductsCount,
      allCategories,
      allBrands,
    };
    return new Response(JSON.stringify(dataPacket), { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Products loading error",
      },
      { status: 500 }
    );
  }
};
