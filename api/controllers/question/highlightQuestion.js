import Question from '../../models/question';

export default async (req, res) => {
  const {eventId, questionId, questionerId} = req.body;

  const question = await Question.findById(questionId);

  const isHighlighted = question.isHighlighted;
  if (isHighlighted) {
    question.isHighlighted = false;
    question.save();
    res.io.to(eventId).emit('set-questions');
    return res.send();
  }

  // cancel other highlights for this event questions
  await Question.findOneAndUpdate(
    {eventId, isHighlighted: true},
    {isHighlighted: false}
  );

  question.isHighlighted = true;
  question.save();
  res.io.to(eventId).emit('set-questions');
  res.send();
};

/* 
eventId de mevcut question idleri bul ve bunların arasından isHighlited ı control et ve sıfırla


questionsları tara aynı event olanları grupla ve bunların arasından # # #
*/
