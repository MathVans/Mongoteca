import {
    getModelForClass,
    modelOptions,
    pre,
    prop,
    Severity,
} from "@typegoose/typegoose";

@modelOptions({
    schemaOptions: {
        timestamps: true,
        collection: "Authors",
    },
    options: {
        allowMixed: Severity.ALLOW, // Or Severity.WARN / Severity.ERROR based on your preference
    },
})
@pre<Author>("save", async function () {
    this.updatedAt = new Date();
})
export class Author {
    @prop({
        required: [true, "Please inform the author name"],
        unique: true,
        trim: true,
        maxlength: [50, "The name can't pass the limit of 50 characters"],
    })
    name!: string;

    @prop({
        trim: true,
        maxlength: [
            50,
            "The nationality can't pass the limit of 50 characters",
        ],
    })
    nationality!: string;

    @prop({
        max: [
            new Date().getFullYear(),
            "The birth year can't be in the future",
        ],
    })
    birthYear!: number;

    @prop({
        default: Date.now,
    })
    createdAt!: Date;

    @prop({
        default: Date.now,
    })
    updatedAt!: Date;

    @prop({
        required: false,
    })
    metadata!: Record<string, any>;
}

export const AuthorModel = getModelForClass(Author);
