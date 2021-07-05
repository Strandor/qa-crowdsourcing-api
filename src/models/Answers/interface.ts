import { Document, Model, Types } from "mongoose";

export interface AnswersInterface extends Document {
	// required objectIds not relevant to article
	questionId: Types.ObjectId;
	creationRoundId: Types.ObjectId;
	// article info
	articleId: Types.ObjectId;
	paragraphIndex: number;
	firstWord?: number;
	lastWord?: number;
	// objectIds needed for verification
	answerRoundId?: Types.ObjectId;
	verificationRoundIds: Types.ObjectId[];
	// records
	verifiedAt?: Date;
	answeredAt?: Date;
	archived: boolean;
	isDisqualified: boolean;
	// flags
	canBeShortened: boolean;
	yesOrNoAnswer?: boolean;
	// methods
	verify: (userId: Types.ObjectId, canBeShortened?: boolean) => Promise<void>;
	setYesOrNoAnswer: (answer: boolean) => Promise<void>;
	toPublic: () => Promise<PublicAnswer>;
}

export interface SpanAnswer {
	roundId: Types.ObjectId;
	firstWord: number;
	lastWord: number;
}

export interface AnswersCollectionInterface extends Model<AnswersInterface> {
	findByIdAndSetSpan: (
		id: string | Types.ObjectId,
		answer: SpanAnswer
	) => Promise<AnswersInterface | null>;
	findByIdAndArchive: (
		id: string | Types.ObjectId
	) => Promise<AnswersInterface | null>;
}

/**
 * This is the interface for questions
 * that are delivered to users as a public
 * view of the resource
 */
export interface PublicYesNo {
	type: "yes-no";
	answerIs: boolean; // true = yes / false = no
	verifiedAt?: Date;
	_id: Types.ObjectId;
}

export interface PublicTextSpan {
	type: "text-span";
	textSpan: string;
	verifiedAt?: Date;
	_id: Types.ObjectId;
}

export interface PublicUnknownType {
	type: "unknown";
	_id: Types.ObjectId;
}

export type PublicAnswer = PublicYesNo | PublicTextSpan | PublicUnknownType;
