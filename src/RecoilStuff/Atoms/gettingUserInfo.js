import { atom } from "recoil";

const gettingUserInfoAtom = atom({
    key:'gettingUserInfoAtom',
    default:{username:'',email:'',password:''}
});

export default gettingUserInfoAtom;