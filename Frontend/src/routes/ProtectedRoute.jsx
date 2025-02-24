
const ProtectedRoute = ({ component : Component, requiredPermission }) => {
  const subMenus = [
    {
      Dashboard: ['Dashboard'],
      Home: ['Home'],
    },
  ];
// check if the user has any of the required permissions
const hasPermission = Array.isArray(requiredPermission) ? requiredPermission.some(permission => Object.keys(subMenus[0]).includes(permission)) : Object.keys(subMenus[0]).includes(requiredPermission);
// Array.isArray - checks whether requiredPermission is array or not

  return hasPermission ? <Component/> : "No permission - component"; 
};

export default ProtectedRoute;
