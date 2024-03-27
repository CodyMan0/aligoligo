import { TargetType } from "./TargetTypes";

export interface GuestService {
	getUserAndTargetNum: () => Promise<UserAndTargetNumType>;
	getGuestTarget: (id: string | undefined) => Promise<TargetType>;
	getTargetVote: ({
		id,
		success,
	}: VoteResponseType) => any;
}

export type VoteResponseType = {
	id: string | undefined;
	success: boolean | null | undefined;
};

export type UserAndTargetNumType = {
	userCount: string;
	targetCount: string;
};
