import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/backend/models/Product";
import APIFilters from "@/lib/APIFilters";

async function updateProductOrigins(products) {
  const productsWithGroupedOrigins = await groupCountriesByMonths(products);

  return productsWithGroupedOrigins.map(({ product, groupedOrigins }) => {
    const newOrigins = product.origins.reduce((acc, origin) => {
      const country = origin.country.en;
      const existingCountry = acc.find((o) => o.country.en === country);

      if (!existingCountry) {
        acc.push({
          country: origin.country,
          months: groupedOrigins.find((go) => go.country === country).months,
        });
      }

      return acc;
    }, []);
    return { product, origins: newOrigins };
  });
}

async function groupCountriesByMonths(products) {
  return products.map((product) => {
    const result = [];

    product.origins.forEach((origin) => {
      let countryEntry = result.find(
        (entry) => entry.country === origin.country.en
      );

      if (!countryEntry) {
        countryEntry = {
          country: origin.country.en,
          months: [],
        };
        result.push(countryEntry);
      }

      // Add only unique months to avoid duplication
      const monthExists = countryEntry.months.some(
        (month) => month.value === origin.month.value
      );

      if (!monthExists) {
        countryEntry.months.push(origin.month);
      }
    });

    return {
      product,
      groupedOrigins: result,
    };
  });
}

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
    productQuery = Product.find();

    const resPerPage = Number(request.headers.get("perpage")) || 15;
    // Extract page and per_page from request URL
    const page = Number(request.nextUrl.searchParams.get("page")) || 1;
    productQuery = productQuery.sort({ createdAt: -1 });
    // total number of documents in database
    const productsCount = await Product.countDocuments();
    // Extract all possible categories
    const allCategories = await Product.distinct("category");
    // Extract all possible categories
    const allBrands = await Product.distinct("brand");

    // Apply search Filters
    const apiProductFilters = new APIFilters(
      productQuery,
      request.nextUrl.searchParams
    )
      .searchAllFields()
      .filter();

    let productsData = await apiProductFilters.query;

    const filteredProductsCount = productsData.length;

    apiProductFilters.pagination(resPerPage, page);
    productsData = await apiProductFilters.query.clone();

    const sortedProducts = productsData
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const groupedMonths = await updateProductOrigins(sortedProducts);
    const products = {
      products: groupedMonths,
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
    return NextResponse.json(
      {
        error: "Products loading error",
      },
      { status: 500 }
    );
  }
};
