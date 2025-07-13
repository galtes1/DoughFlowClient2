const normalizEditForUser = (user) => {
    return {
        name: user.name,
    }
};

export default normalizEditForUser;