import {Questioner} from '../../models';

export default async (req, res) => {
  const {questionerId} = req.query;

  const {_id, name} = await Questioner.findById(questionerId).select({
    _id: 1,
    name: 1,
  });

  res.json({_id, name});
};