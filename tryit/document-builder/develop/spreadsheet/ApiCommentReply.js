builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
oWorksheet.GetRange("A1").SetValue("1");
var oRange = oWorksheet.GetRange("A1");
var oComment = oRange.AddComment("This is just a number.");
oComment.AddReply("Reply 1", "John Smith", "uid-1");
var oReply = oComment.GetReply();
var sType = oReply.GetClassType();
oWorksheet.GetRange("A3").SetValue("Type: " + sType);
oReply.SetAuthorName("Mark Potato");
oWorksheet.GetRange("A4").SetValue("Comment's reply author: " + oReply.GetAuthorName());
oReply.SetUserId("uid-2");
oWorksheet.GetRange("A5").SetValue("Comment's reply user Id: " + oReply.GetUserId());
oReply.SetTime(Date.now());
oWorksheet.GetRange("A6").SetValue("Comment's reply timestamp: " + oReply.GetTime());
oReply.SetTimeUTC(Date.now());
oWorksheet.GetRange("A7").SetValue("Comment's reply timestamp UTC: " + oReply.GetTimeUTC());
builder.SaveFile("xlsx", "ApiCommentReply.xlsx");
builder.CloseFile();