import supabase from "./supabase";

export async function getBooks({ statusFilter, tagFilter }) {
  let query = supabase.from("bookmarks").select("*");
  if (statusFilter)
    query = query[statusFilter.method || "eq"](
      statusFilter.field,
      statusFilter.value,
    );

  if (tagFilter)
    query = query[tagFilter.method || "eq"](tagFilter.field, tagFilter.value);

  const { data: bookmarks, error } = await query;
  if (error) {
    throw new Error("Bookmarks Not Found");
  }
  return bookmarks;
}

export async function getBook(id) {
  const { data: bookmark, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw new Error("Book not found");
  }
  return bookmark;
}

//we can merge addBook and editBook almost the same code
export async function addBook(data) {
  const { data: addedBook, error } = await supabase
    .from("bookmarks")
    .insert([{ ...data }])
    .single();
  if (error) {
    throw new Error("Book could not add");
  }
  return addedBook;
}

export async function editBook(formData, id) {
  const { data, error } = await supabase
    .from("bookmarks")
    .update({ ...formData })
    .eq("id", id)
    .select();

  if (error) {
    throw new Error("Book could not edited");
  }
  return data;
}

export async function deleteBook(id) {
  const { error } = await supabase.from("bookmarks").delete().eq("id", id);
  if (error) {
    throw new Error("Book could not deleted");
  }
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    throw new Error("Ops.. Something went wrong.");
  }
  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error("Ops.. Something went wrong.");
  }
}

export async function getUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error("Ops.. Something went wrong.");
  }
  return data;
}
