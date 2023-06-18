import { useFormContext } from "react-hook-form";
import TargetCreateLayout from "../layout/TargetCreateLayout";
import { useGetFormData } from "../../hooks/useGetFormData";

type Props = {
	setStep: React.Dispatch<
		React.SetStateAction<"goal" | "subGoal" | "duration" | "lastStep">
	>;
};

const LastStep = ({ setStep }: Props) => {
	const {
		formState: { errors },
	} = useFormContext();
	const { getGoal, getSubGoal, getRoutine, endDate } = useGetFormData();

	console.log("goal", getGoal);
	console.log("sub", getSubGoal);
	console.log("routine", getRoutine);
	console.log("endDate", endDate);

	return (
		<TargetCreateLayout title="수정하실껀가요? ">
			<div className="flex gap-4">
				<button
					className={`w-full h-16 text-xl bg-main px-10 py-2 mt-10 text-white rounded-xl`}
					type="button"
					onClick={() => {
						setStep("duration");
					}}
				>
					이전
				</button>
				<button
					className={`w-full h-16 text-xl bg-main px-10 py-2 mt-10 text-white rounded-xl`}
					type="submit"
				>
					다음으로 가기
				</button>
			</div>
		</TargetCreateLayout>
	);
};

export default LastStep;
