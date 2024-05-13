builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
oWorksheet.GetRange("A1").SetValue("1");
var oRange = oWorksheet.GetRange("A1");
var oComment = oRange.AddComment("This is just a number.");
oWorksheet.GetRange("A3").SetValue("Comment: " + oComment.GetText());
oWorksheet.GetRange("A4").SetValue("Comment Id: ");
oWorksheet.GetRange("B4").SetValue(oRange.GetComment().GetId());
oWorksheet.GetRange("A5").SetValue("Comment's quote text: " + oComment.GetQuoteText());
var sType = oComment.GetClassType();
oWorksheet.GetRange("A6").SetValue("Type: " + sType);
oComment.SetAuthorName("Mark Potato");
oWorksheet.GetRange("A7").SetValue("Comment's author: " + oComment.GetAuthorName());
oComment.SetUserId("uid-2");
oWorksheet.GetRange("A8").SetValue("Comment's user Id: " + oComment.GetUserId());
oComment.SetTime(Date.now());
oWorksheet.GetRange("A9").SetValue("Timestamp: " + oComment.GetTime());
oComment.SetTimeUTC(Date.now());
oWorksheet.GetRange("A10").SetValue("Timestamp UTC: " + oComment.GetTimeUTC());
oComment.SetSolved(true);
oWorksheet.GetRange("A11").SetValue("Comment is solved: " + oComment.IsSolved());
oComment.AddReply("Reply 1", "John Smith", "uid-1");
oComment.AddReply("Reply 2", "John Smith", "uid-1");
oComment.RemoveReplies(0, 1, false);
oWorksheet.GetRange("A12").SetValue("Comment replies count: " + oComment.GetRepliesCount());
var oReply = oComment.GetReply();
oWorksheet.GetRange("A13").SetValue("Comment's reply text: " + oReply.GetText());
builder.SaveFile("xlsx", "ApiComment.xlsx");
builder.CloseFile();
