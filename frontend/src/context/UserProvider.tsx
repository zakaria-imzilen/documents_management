import { ReactNode, useState } from "react";
import { IUserStateConn, IUserStateNotConn } from "../types/user.types";
import UserContext from "./user.context";

const UserProvider = ({ children }: { children: ReactNode }) => {
	const [userState, setUserState] = useState<
		IUserStateConn | IUserStateNotConn
	>({
		isConnected: false,
		data: null,
	});
	return (
		<UserContext.Provider value={{ userState, setUserState }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
