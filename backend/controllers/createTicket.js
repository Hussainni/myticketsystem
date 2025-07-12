const attachment = req.file ? req.file.filename : null;

export const ticket = new Ticket({
  title,
  description,
  category,
  priority,
  createdBy: req.user._id,
  attachment,
});
