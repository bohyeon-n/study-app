const create = async (data: any, url: string) => {
  const response = await fetch(url, {
    method: "POST",
  }).then((response) => response.json());
  return response.data;
};

export { create };
