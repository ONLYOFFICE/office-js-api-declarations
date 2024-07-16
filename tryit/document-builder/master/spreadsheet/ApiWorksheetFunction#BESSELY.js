builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.BESSELY(2.5, 1));
builder.SaveFile("xlsx", "BESSELY.xlsx");
builder.CloseFile();