export const uploadToCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "unsigned_preset");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dfhu797dj/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  if (!response.ok) {
    throw new Error("Image upload failed");
  }

  const json = await response.json();
  return json.secure_url;
};
