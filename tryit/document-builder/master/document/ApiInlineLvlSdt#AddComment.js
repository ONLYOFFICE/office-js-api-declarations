builder.CreateFile("docx");
var oDocument = Api.GetDocument();
var oParagraph = oDocument.GetElement(0);
var oInlineLvlSdt = Api.CreateInlineLvlSdt();
oInlineLvlSdt.AddText("This is an inline text content control.");
oParagraph.AddInlineLvlSdt(oInlineLvlSdt);
oInlineLvlSdt.AddComment("comment", "John Smith", "uid-1");
builder.SaveFile("docx", "AddComment.docx");
builder.CloseFile();