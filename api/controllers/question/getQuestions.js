import {Event} from '../../models';

export default async (req, res) => {
  const {eventId} = req.query;
  try {
    const {questions} = await Event.findById(eventId)
      .populate({
        path: 'questions',
        populate: {path: 'ownerParticipantId', select: {name: 1}},
        /* options: {sort: {likeCount: -1}}, */
      })
      .select({questions: 1});

    return res.send(questions);
  } catch (error) {
    return res.status(400).send();
  }
};
