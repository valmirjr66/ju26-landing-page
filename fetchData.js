import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

mongoose.connection.on("error", console.error);

mongoose.connection.on("connected", () => {
  console.log("Connected");
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Mongo connection failed");
    console.error("name:", err.name);
    console.error("message:", err.message);
    console.error("reason:", err.reason);
    console.error("cause:", err.cause);
    console.error(err);
  });

const SupporterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    whatsapp: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    source: {
      type: String,
      required: true,
      trim: true,
    },
    check_receiveMaterial: {
      type: Boolean,
      required: false
    },
    check_supportArt: {
      type: Boolean,
      required: false
    },
    check_supportSocialMedia: {
      type: Boolean,
      required: false
    },
    check_supportStreets: {
      type: Boolean,
      required: false
    },
  },
  {
    timestamps: true,
  }
);

const supporterModel = mongoose.model("supporter", SupporterSchema)

const myArgs = process.argv.slice(2);
console.log("Custom args:", myArgs);

const firstArg = myArgs[0];

try {
  const supporters = await supporterModel.find({
    createdAt: { $gt: firstArg + 'T00:00:00.000Z' }
  });

  if (supporters.length === 0) {
    "No supporters found"
  } else {
    for (let i = 0; i < supporters.length; i++) {
      console.log(JSON.stringify(supporters[i], null, 2));
    }
  }
} catch (err) {
  console.error(err);
}

process.exit()