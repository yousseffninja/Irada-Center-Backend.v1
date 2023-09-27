const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID. 404"));
    }

    res.status(204).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

exports.updateOne = async (req, res, next, Model) => {
  const doc = await Model.findByIdAndUpdate(req.params.id, req.body);

  if (!doc) {
    return next(new AppError("No document found with that ID. 404"));
  }

  res.status(200).json({
    status: "success",
    data: {
      doc,
    },
  });
}

exports.updateOneMagdy = async (req, res, next, Model) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body);

    if (!doc) {
        return next(new AppError("No document found with that ID. 404"));
    }

    res.status(200).json({
        status: "success",
        data: {
            doc,
        },
    });
}

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

exports.getOne = async(req, res, next, Model, popOptions) => {
  let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID. 404"));
    }

    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
};

exports.search = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.id) filter = { model: req.params.id };
    const { key } = req.body;

    const features = new APIFeatures(
      Model.find({ name: { $regex: new RegExp(key, "i") } }),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .Pagination();
    const doc = await features.query;
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.id) filter = { model: req.params.id };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .Pagination();
    const doc = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: Model?.length || 0,
      data: {
        doc,
      },
    });
  });

exports.getAllMagdy = async (req, res, next, Model) => {
  let filter = {};
  if (req.params.id) filter = { model: req.params.id };
  const count = await Model.find()
  const features = new APIFeatures(Model.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .Pagination();

  const doc = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    filteredResults: count?.length || 0,
    data: {
      doc,
    },
  });
};