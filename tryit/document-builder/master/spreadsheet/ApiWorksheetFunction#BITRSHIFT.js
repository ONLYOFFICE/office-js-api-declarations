builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.BITRSHIFT(13, 2));
builder.SaveFile("xlsx", "BITRSHIFT.xlsx");
builder.CloseFile();