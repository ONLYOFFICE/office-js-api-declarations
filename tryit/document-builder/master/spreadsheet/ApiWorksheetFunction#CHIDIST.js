builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
var avg = oFunction.CHIDIST(12, 10);
oWorksheet.GetRange("B2").SetValue(avg);
builder.SaveFile("xlsx", "CHIDIST.xlsx");
builder.CloseFile();