builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
var oShape = oWorksheet.AddShape("flowChartOnlineStorage", 120 * 36000, 70 * 36000, oFill, oStroke, 0, 2 * 36000, 0, 3 * 36000);
var oDocContent = oShape.GetContent();
var oParagraph = oDocContent.GetElement(0);
var oRun = Api.CreateRun();
oRun.AddText("This is just a sample text. ");
oParagraph.AddElement(oRun);
oRun = Api.CreateRun();
oRun.SetVertAlign("subscript");
oRun.AddText("This is a text run with the text aligned below the baseline vertically. ");
oParagraph.AddElement(oRun);
oRun = Api.CreateRun();
oRun.SetVertAlign("baseline");
oRun.AddText("This is a text run with the text aligned by the baseline vertically. ");
oParagraph.AddElement(oRun);
oRun = Api.CreateRun();
oRun.SetVertAlign("superscript");
oRun.AddText("This is a text run with the text aligned above the baseline vertically.");
oParagraph.AddElement(oRun);
builder.SaveFile("xlsx", "SetVertAlign.xlsx");
builder.CloseFile();
