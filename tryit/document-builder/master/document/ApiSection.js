builder.CreateFile("docx");
var oDocument = Api.GetDocument();
var oParagraph = oDocument.GetElement(0);
var oSection = oDocument.GetFinalSection();
oSection.SetEqualColumns(3, 720);
oParagraph.AddText("This is a text split into 3 equal columns. ");
oParagraph.AddText("The columns are separated by the distance of half an inch.");
oParagraph.AddColumnBreak();
oParagraph.AddText("This text starts from column #2. ");
oParagraph.AddText("This sentence is used to add lines for demonstrative purposes.");
oParagraph.AddColumnBreak();
oParagraph.AddText("This text starts from column #3. ");
oParagraph.AddText("This sentence is used to add lines for demonstrative purposes.");
var oFooter = oSection.GetFooter("default", true);
oSection.SetFooterDistance(1440);
oParagraph = oFooter.GetElement(0);
oParagraph.AddText("This is a page footer. ");
oParagraph.AddText("The distance from the page bottom to the footer is 1 inch (1440 twentieths of a point).");
var oHeader = oSection.GetHeader("default", true);
oSection.SetHeaderDistance(1440);
oParagraph = oHeader.GetElement(0);
oParagraph.AddText("This is a page header. ");
oParagraph.AddText("The distance from the page top to the header is 1 inch (1440 twentieths of a point).");
oSection.SetPageMargins(720, 720, 720, 720);
builder.SaveFile("docx", "ApiSection.docx");
builder.CloseFile();
