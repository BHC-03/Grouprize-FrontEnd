import UserInfoAtom from "./Atoms/UserInfoAtom";
import GettingUserInfoAtom from "./Atoms/gettingUserInfo";
import UserGroupsAtom from "./Atoms/userGroupsAtom";
import RejectedGroupsSelector from "./Selectors/rejectedGroups";
import MemberGroupsSelector from "./Selectors/memberGroups";
import PendingGroupsSelector from "./Selectors/pendingGroups";
import ActiveGroupAtom from "./Atoms/activeGroup";
import MemberShipExistenceSelector from "./Selectors/membershipExistenceSelector";
import IsMemberSelector from "./Selectors/isMemberSelector";
import IsAdminSelector from "./Selectors/isAdminSelector";



//user Information Atoms
export const userInfoAtom = UserInfoAtom;
export const gettingUserinfoAtom = GettingUserInfoAtom;


//user groups atoms
export const userGroupsAtom = UserGroupsAtom;
export const rejectedGroupsSelector = RejectedGroupsSelector;
export const pendingGroupsSelector = PendingGroupsSelector;
export const memberGroupsSelector = MemberGroupsSelector;


//active group and memberships
export const activeGroupAtom = ActiveGroupAtom;
export const memberShipExistenceSelector = MemberShipExistenceSelector;
export const isMemberSelector = IsMemberSelector;
export const isAdminSelector = IsAdminSelector;