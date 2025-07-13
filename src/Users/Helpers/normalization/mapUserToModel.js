const mapUserToModel = (user) => {
  if (!user) {
    console.warn("mapUserToModel: user is undefined!");
    return {
      userId: 0,
      name: "",
      email: "",
      password: "",
      isBusiness: false,
    };
  }

  return {
    userId: user.userId || 0,
    name: user.name || "",
    email: user.email || "",
    password: user.password || "",
    isBusiness: user.isBusiness ?? false,
  };
};

export default mapUserToModel;
