builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
var avg = oFunction.CRITBINOM(678, 0.1, 0.007);
oWorksheet.GetRange("B2").SetValue(avg);
builder.SaveFile("xlsx", "CRITBINOM.xlsx");
builder.CloseFile();