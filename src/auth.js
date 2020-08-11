export const isAuthenticated = () => {
	const sessionToken = localStorage.getItem('sessionToken');

	if (sessionToken) {
		return true;
	}
	return false;
};

export default isAuthenticated;
