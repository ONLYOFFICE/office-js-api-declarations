builder.CreateFile("docx");
var oDocument = Api.GetDocument();
var oHeading6Style = oDocument.GetStyle("Heading 6");
var oParaPr = oHeading6Style.GetParaPr();
oParaPr.SetStyle(oHeading6Style);
oParaPr.SetJc("center");
var oParagraph = oDocument.GetElement(0);
oParagraph.SetStyle(oHeading6Style);
oParagraph.AddText("This is a text in a paragraph styled with the 'Heading 6' style.");
builder.SaveFile("docx", "ApiParaPr.docx");
builder.CloseFile();
