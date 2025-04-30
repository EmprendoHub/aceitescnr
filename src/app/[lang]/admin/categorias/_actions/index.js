"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import Category from "@/backend/models/Category";
import CatFilters from "@/lib/CatFilters";
import dbConnect from "@/lib/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function addNewCategory(data) {
  const session = await getServerSession(options);
  const user = { _id: session?.user?._id };
  let {
    name,
    summary,
    mainImage,
    benefits,
    precautions,
    characteristics,
    industryClients,
  } = Object.fromEntries(data);

  //check for errors
  name = JSON.parse(name);
  summary = JSON.parse(summary);
  mainImage = JSON.parse(mainImage);
  benefits = JSON.parse(benefits);
  precautions = JSON.parse(precautions);
  characteristics = JSON.parse(characteristics);
  industryClients = JSON.parse(industryClients);

  await dbConnect();

  const newCategory = await Category.create({
    name,
    summary,
    benefits,
    precautions,
    characteristics,
    industry_clients: industryClients,
    images: [{ url: mainImage }],
    published: true,
    user,
  });
  console.log(newCategory);
  //if (error) throw Error(error);
  revalidatePath("/en/admin/categorias");
  return {
    success: {
      ok: "Categoryo se creo con exito",
    },
  };
}

export async function editOneCategory(data, id) {
  const session = await getServerSession(options);
  const user = { _id: session?.user?._id };
  let {
    name,
    summary,
    mainImage,
    benefits,
    precautions,
    characteristics,
    industryClients,
  } = Object.fromEntries(data);

  //check for errors
  name = JSON.parse(name);
  summary = JSON.parse(summary);
  mainImage = JSON.parse(mainImage);
  benefits = JSON.parse(benefits);
  precautions = JSON.parse(precautions);
  characteristics = JSON.parse(characteristics);
  industryClients = JSON.parse(industryClients);

  await dbConnect();

  const newCategory = await Category.updateOne(
    { _id: id },
    {
      name,
      summary,
      benefits,
      precautions,
      characteristics,
      industry_clients: industryClients,
      images: [{ url: mainImage }],
      published: true,
      user,
    }
  );
  console.log(newCategory);
  //if (error) throw Error(error);
  revalidatePath("/en/admin/categorias");
  return {
    success: {
      ok: "Categoryo se actualizo con exito",
    },
  };
}

export async function getAllCategory(searchQuery) {
  try {
    await dbConnect();
    const session = await getServerSession(options);
    let categoryQuery;
    if (session) {
      if (
        session?.user?.role === "manager" ||
        session?.user?.role === "sucursal"
      ) {
        categoryQuery = Category.find();
      }
    } else {
      categoryQuery = Category.find({ published: true });
    }

    const searchParams = new URLSearchParams(searchQuery);
    const resPerPage = Number(searchParams.get("perpage")) || 10;
    // Extract page and per_page from request URL
    const page = Number(searchParams.get("page")) || 1;
    categoryQuery = categoryQuery.sort({ createdAt: -1 });
    // total number of documents in database
    const categoriesCount = await Category.countDocuments();
    // Extract all possible categories
    const apiCategoryFilters = new CatFilters(categoryQuery, searchParams)
      .searchAllFields()
      .filter();

    let categoriesData = await apiCategoryFilters.query;

    const filteredCategoriesCount = categoriesData.length;

    apiCategoryFilters.pagination(resPerPage, page);
    categoriesData = await apiCategoryFilters.query.clone();
    let sortedCategories = JSON.stringify(categoriesData);
    revalidatePath("/admin/categorias/");
    return {
      categories: sortedCategories,
      categoriesCount,
      filteredCategoriesCount,
    };
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function getAllCategoryFull() {
  try {
    await dbConnect();

    let categoryQuery = Category.find({ published: true });
    categoryQuery = await categoryQuery.sort({ createdAt: -1 });
    // total number of documents in database
    const categoriesCount = await Category.countDocuments();
    // Extract all possible categories

    let sortedCategories = JSON.stringify(categoryQuery);
    revalidatePath("/admin/categorias/");
    revalidatePath("/productos/");
    return {
      categories: sortedCategories,
      categoriesCount,
    };
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function changeCategoryAvailability(categoryId) {
  try {
    await dbConnect();
    // Find the category that contains the variation with the specified variation ID
    let category = await Category.findOne({ _id: categoryId });

    if (category.published === true) {
      category.published = false; // Remove from physical branch
    } else {
      category.published = true; // Add to physical branch
    }

    // Save the category to persist the changes
    await category.save();
    revalidatePath("/admin/categorias");
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function deleteOneCategory(categoryId) {
  try {
    await dbConnect();
    // Find the product that contains the variation with the specified variation ID
    await Category.findOneAndDelete({ _id: categoryId });

    revalidatePath("/admin/categorias");
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function getOneCategory(id) {
  try {
    await dbConnect();
    let category;
    category = await Category.findOne({ _id: id });

    // convert to string
    category = JSON.stringify(category);
    return { category: category };
    // return { product };
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}
