builder.CreateFile("pdf");
var oDocument = Api.GetDocument();
var oDateForm = Api.CreateDateForm({"key": "Nowadays", "tip": "Enter current date", "required": true, "placeholder": "Date", "format": "mm.dd.yyyy", "lang": "en-US"});
oDateForm.SetTime(new Date().getTime());
var oParagraph = oDocument.GetElement(0);
oParagraph.AddElement(oDateForm);
var oCopyDateForm = oDateForm.Copy();
oParagraph.AddLineBreak();
oParagraph.AddElement(oCopyDateForm);
builder.SaveFile("pdf", "Copy.pdf");
builder.CloseFile();