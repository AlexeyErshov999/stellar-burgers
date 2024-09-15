export type ProtectedRouteProps = {
    onlyUnauth?: boolean; // флаг, обозначающий потребность в авторизации
    children: React.ReactElement;
  };
