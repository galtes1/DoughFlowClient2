const normalizeUser = (user) => {
    return {
      userId: user.userId,
      name: user.name,
      email: user.email,
      password: user.password,
      isBusiness: user.isBusiness,
      currentPassword: user.currentPassword,
    }
  };
  
  export default normalizeUser;

  
  