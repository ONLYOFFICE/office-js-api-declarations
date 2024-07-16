builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.IMABS("-2+2.5i"));
builder.SaveFile("xlsx", "IMABS.xlsx");
builder.CloseFile();