builder.CreateFile("pdf");
var oDocument = Api.GetDocument();
var oDateForm = Api.CreateDateForm({"key": "Nowadays", "tip": "Enter current date", "required": true, "placeholder": "Date", "format": "mm.dd.yyyy", "lang": "en-US"});
var oParagraph = oDocument.GetElement(0);
oParagraph.AddElement(oDateForm);
oDateForm.SetLanguage("en-CA");
var sLanguage = oDateForm.GetLanguage();
oParagraph = Api.CreateParagraph();
oParagraph.AddText("Date language: " + sLanguage);
oDocument.Push(oParagraph);
builder.SaveFile("pdf", "GetLanguage.pdf");
builder.CloseFile();