builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
var ans = oFunction.AVERAGEA(78, 98, 46, 123, 45, true, false);
oWorksheet.GetRange("B2").SetValue(ans);
builder.SaveFile("xlsx", "AVERAGEA.xlsx");
builder.CloseFile();