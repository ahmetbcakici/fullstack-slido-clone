import Event from '../../models/event';

export default async (req, res) => {
  const {eventId} = req.query;

  const {questions} = await Event.findById(eventId)
    .populate({
      path: 'questions',
      populate: {path: 'ownerQuestionerId', select: {name: 1}},
    })
    .select({questions: 1});

  res.send(questions);
};
