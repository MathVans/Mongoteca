import {
    getModelForClass,
    modelOptions,
    prop,
    Ref,
    Severity,
} from "@typegoose/typegoose";
import { Author } from "./Author";

@modelOptions({
    schemaOptions: {
        timestamps: true,
        collection: "Books",
    },
    options: {
        allowMixed: Severity.ALLOW, // Or Severity.WARN / Severity.ERROR based on your preference
    },
})
export class Books {
    @prop({
        required: [true, "Please inform the isbn"],
        unique: true,
        trim: true,
        maxlength: [13, "The isbn can't pass the limit of 13 characters"],
    })
    isbn!: string;

    @prop({
        required: [true, "Please inform the title"],
        trim: true,
        maxlength: [250, "The title can't pass the limit of 250 characters"],
    })
    title!: string;

    @prop({
        required: [true, "Please informe the author"],
        ref: () => Author,
    })
    author!: Ref<Author>;

    @prop({ required: false })
    coauthors?: Ref<Author>[];

    @prop({
        required: false,
        maxlength: [250, "The resume can't pass the limit of 250 characters"],
    })
    resume?: string;

    @prop({ required: true })
    releaseYear!: number;

    @prop({ required: false })
    pages?: number;

    @prop({ required: false })
    metadata!: Record<string, any>;
}

export const BookModel = getModelForClass(Books);
