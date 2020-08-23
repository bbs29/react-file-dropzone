import { IncomingForm } from "formidable";

const upload = (req: any, res: any, next: any) => {
  let form = new IncomingForm();
  form.multiples = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ fields, files });
  });
};

export default upload;
