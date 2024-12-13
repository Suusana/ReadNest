import { UserState } from "@/types/user"

const USERKEY = "user"
function setUser(user: UserState) {
    localStorage.setItem('user', JSON.stringify(user));
}

function getUser(): UserState | null {
    const user = localStorage.getItem(USERKEY);
    return user ? JSON.parse(user) as UserState : null;
}

function removeUser() {
    localStorage.removeItem(USERKEY)
}

export {
    setUser,
    getUser,
    removeUser
}