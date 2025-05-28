import { Schema, model } from "mongoose";

const invoiceSchema = Schema({
    reservation: {
        type: Schema.Types.ObjectId,
        ref: "Reservation",
        required: true
    },
    issueDate: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: true
    },
    additionalCharges: [{
        serviceType: {
            type: String,
            enum: ["Hotel", "Singleroom", "Doubleroom", "Suite", "Deluxeroom", "Event"],
            required: true
        },
        description: {
            type: String,
            maxLength: 200
        },
        amount: {
            type: Number,
            required: true,
            min: [0, "Amount cannot be negative"]
        }
    }],
    amount: {
        type: Number,
        required: true,
        min: [0, "Amount cannot be negative"]
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ["CREDIT_CARD", "DEBIT_CARD", "CASH", "BANK_TRANSFER"]
    },
    paymentStatus: {
        type: String,
        required: true,
        enum: ["PENDING", "PAID", "CANCELLED", "REFUNDED"],
        default: "PENDING"
    },
    invoiceNumber: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    },
    history: [{
        date: {
            type: Date,
            default: Date.now
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        action: {
            type: String,
            required: true
        },
        details: {
            type: String,
            maxLength: 300
        }
    }]
}, {
    timestamps: true,
    versionKey: false
});

invoiceSchema.methods.toJSON = function () {
    const { __v, _id, ...invoice } = this.toObject();
    invoice.iid = _id;
    return invoice;
};

export default model("Invoice", invoiceSchema);