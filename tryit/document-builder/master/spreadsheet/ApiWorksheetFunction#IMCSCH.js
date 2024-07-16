builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.IMCSCH("-2+2.5i"));
builder.SaveFile("xlsx", "IMCSCH.xlsx");
builder.CloseFile();