// Express server and create application
let express = require("express");
let groceryRepo = require("./repos/groceryRepo.js");
let app = express();

// Use the express router object
let router = express.Router();

// Middle ware to support JSON data passing to API
app.use(express.json());

// GET requrest to return a list of all grocery items
router.get("/", (req, res, next) => {
  groceryRepo.get(
    (data) => {
      res.status(200).json({
        status: 200,
        statusText: "OK",
        message: "All groceries retrieved.",
        data: data,
      });
    },
    (err) => {
      next(err);
    }
  );
});

// GET requrest to return a grocery item object by id
router.get("/:id", (req, res, next) => {
  groceryRepo.getById(
    req.params.id,
    (data) => {
      if (data) {
        res.status(200).json({
          status: 200,
          statusText: "OK",
          message: "Single Item retrieved.",
          data: data,
        });
      } else {
        res.status(404).json({
          status: 404,
          statusText: "Not Found",
          message: `The item ${req.params.id} could not be found.`,
          error: {
            code: "NOT_FOUND",
            message: `The item ${req.params.id} could not be found.`,
          },
        });
      }
    },
    (err) => {
      next(err);
    }
  );
});

// POST request to insert an item
router.post("/", (req, res) => {
  groceryRepo.insert(
    req.body,
    (data) => {
      res.status(201).json({
        status: 201,
        statusText: "Created",
        message: "New Grocery Item added.",
        data: data,
      });
    },
    (err) => {
      next(err);
    }
  );
});

// PUT requrest to update an item
router.put("/:id", (req, res) => {
  groceryRepo.getById(req.params.id, (data) => {
    if (data) {
      groceryRepo.update(
        req.body,
        req.params.id,
        (data) => {
          res.status(200).json({
            status: 200,
            statusText: "OK",
            message: `Item ${req.params.id} updated.`,
            data: data,
          });
        },
        (err) => {
          next(err);
        }
      );
    } else {
      res.status(404).json({
        status: 404,
        statusText: "Not Found",
        message: `The grocery ${req.params.id} could not be found.`,
        error: {
          code: "NOT_FOUND",
          message: `The grocery ${req.params.id} could not be found.`,
        },
      });
    }
  });
});

// DELETE request to delete a grocery item object by id
router.delete("/:id", (req, res, next) => {
  groceryRepo.getById(req.params.id, (data) => {
    if (data) {
      groceryRepo.delete(
        req.params.id,
        (data) => {
          res.status(200).json({
            status: 200,
            statusText: "OK",
            message: `Item ${req.params.id} deleted.`,
            data: `Item ${req.params.id} deleted.`,
          });
        },
        (err) => {
          next(err);
        }
      );
    } else {
      res.status(404).json({
        status: 404,
        statusText: "Not Found",
        message: `The grocery ${req.params.id} could not be found.`,
        error: {
          code: "NOT_FOUND",
          message: `The grocery ${req.params.id} could not be found.`,
        },
      });
    }
  });
});

// Configure router so all routes are prefixed with /api/
app.use("/api/", router);

// Create server to listen on port 5000
var server = app.listen(5000, () => {
  console.log("Node server is running on http://localhost:5000.");
});
