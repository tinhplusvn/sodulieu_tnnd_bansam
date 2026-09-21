import { ageFromBirthDate, blockFromAge, suggestClass } from "./age";
import type { ChildDraft, ChildRecord, Gender, HamletId } from "./types";

type SeedRow = {
  fullName: string;
  birthDate: string;
  gender: Gender;
  fatherName: string;
  motherName: string;
  parentPhone: string;
  hamlet: HamletId;
  currentAddress: string;
  notes: string;
};

const ROWS: SeedRow[] = [
  {
    fullName: "Nguyễn Văn Minh",
    birthDate: "2012-11-20",
    gender: "nam",
    fatherName: "Nguyễn Văn Thành",
    motherName: "Phạm Thị Hoa",
    parentPhone: "0912345678",
    hamlet: "sam-1",
    currentAddress: "",
    notes: "",
  },
  {
    fullName: "Trần Thị Ánh",
    birthDate: "2018-02-08",
    gender: "nu",
    fatherName: "Trần Văn Bình",
    motherName: "Lê Thị Hằng",
    parentPhone: "0987654321",
    hamlet: "sam-2",
    currentAddress: "",
    notes: "",
  },
  {
    fullName: "Lê Đức Phúc",
    birthDate: "2022-06-14",
    gender: "nam",
    fatherName: "Lê Văn Cường",
    motherName: "Hoàng Thị Nga",
    parentPhone: "0903123456",
    hamlet: "sam-3",
    currentAddress: "",
    notes: "",
  },
  {
    fullName: "Hoàng Thị Lan",
    birthDate: "2011-01-30",
    gender: "nu",
    fatherName: "Hoàng Văn Sơn",
    motherName: "Đỗ Thị Huệ",
    parentPhone: "0934567890",
    hamlet: "bai-ca",
    currentAddress: "",
    notes: "Lớp trưởng",
  },
  {
    fullName: "Phạm Văn Hùng",
    birthDate: "2020-09-03",
    gender: "nam",
    fatherName: "Phạm Văn Dũng",
    motherName: "Ngô Thị Mai",
    parentPhone: "0978123456",
    hamlet: "sam-1",
    currentAddress: "",
    notes: "",
  },
  {
    fullName: "Đỗ Thị Ngọc",
    birthDate: "2016-12-22",
    gender: "nu",
    fatherName: "Đỗ Văn Hải",
    motherName: "Bùi Thị Lý",
    parentPhone: "0945678901",
    hamlet: "sam-2",
    currentAddress: "",
    notes: "",
  },
  {
    fullName: "Bùi Quang Hải",
    birthDate: "2023-03-18",
    gender: "nam",
    fatherName: "Bùi Văn Phong",
    motherName: "Vũ Thị Oanh",
    parentPhone: "0966789012",
    hamlet: "sam-3",
    currentAddress: "",
    notes: "",
  },
  {
    fullName: "Vũ Thị Mai",
    birthDate: "2014-07-09",
    gender: "nu",
    fatherName: "Vũ Văn Long",
    motherName: "Cao Thị Yến",
    parentPhone: "0911222333",
    hamlet: "bai-ca",
    currentAddress: "",
    notes: "",
  },
  {
    fullName: "Ngô Văn Tuấn",
    birthDate: "2019-05-25",
    gender: "nam",
    fatherName: "Ngô Văn Đạt",
    motherName: "Lý Thị Hương",
    parentPhone: "0888123456",
    hamlet: "sam-1",
    currentAddress: "",
    notes: "",
  },
  {
    fullName: "Lý Thị Hương",
    birthDate: "2021-10-11",
    gender: "nu",
    fatherName: "Lý Văn Tâm",
    motherName: "Trịnh Thị Hà",
    parentPhone: "",
    hamlet: "sam-2",
    currentAddress: "",
    notes: "Chưa có SĐT phụ huynh",
  },
  {
    fullName: "Trịnh Văn Long",
    birthDate: "2015-08-19",
    gender: "nam",
    fatherName: "Trịnh Văn Hòa",
    motherName: "Mai Thị Nhung",
    parentPhone: "0923456789",
    hamlet: "sam-3",
    currentAddress: "",
    notes: "",
  },
  {
    fullName: "Mai Thị Hà",
    birthDate: "2017-04-05",
    gender: "nu",
    fatherName: "Mai Văn Kiên",
    motherName: "Đặng Thị Thu",
    parentPhone: "0933222111",
    hamlet: "bai-ca",
    currentAddress: "",
    notes: "",
  },
  {
    fullName: "Đặng Văn Nam",
    birthDate: "2021-01-28",
    gender: "nam",
    fatherName: "Đặng Văn Phú",
    motherName: "Cao Thị Lệ",
    parentPhone: "0955667788",
    hamlet: "sam-1",
    currentAddress: "",
    notes: "",
  },
  {
    fullName: "Cao Thị Yến",
    birthDate: "2013-09-16",
    gender: "nu",
    fatherName: "Cao Văn Hưng",
    motherName: "Phan Thị Dung",
    parentPhone: "0977000111",
    hamlet: "sam-2",
    currentAddress: "",
    notes: "",
  },
  {
    fullName: "Phan Văn Dũng",
    birthDate: "2024-02-02",
    gender: "nam",
    fatherName: "Phan Văn Toàn",
    motherName: "Lương Thị Thảo",
    parentPhone: "0909000111",
    hamlet: "sam-3",
    currentAddress: "",
    notes: "Chưa đến tuổi mầm non",
  },
  {
    fullName: "Lương Thị Thảo",
    birthDate: "2010-06-21",
    gender: "nu",
    fatherName: "Lương Văn Bình",
    motherName: "Hồ Thị Xuân",
    parentPhone: "0918000222",
    hamlet: "bai-ca",
    currentAddress: "",
    notes: "Trên 15 tuổi",
  },
  {
    fullName: "Hồ Văn Khoa",
    birthDate: "2018-11-07",
    gender: "nam",
    fatherName: "Hồ Văn Quang",
    motherName: "Đinh Thị Linh",
    parentPhone: "0988111222",
    hamlet: "sam-1",
    currentAddress: "",
    notes: "",
  },
  {
    fullName: "Đinh Thị Linh",
    birthDate: "2022-12-01",
    gender: "nu",
    fatherName: "Đinh Văn Thắng",
    motherName: "Nguyễn Thị Tuyết",
    parentPhone: "0944333222",
    hamlet: "sam-2",
    currentAddress: "",
    notes: "",
  },
];

export function draftFromSeed(row: SeedRow): ChildDraft {
  const age = ageFromBirthDate(row.birthDate) ?? 0;
  return {
    ...row,
    block: blockFromAge(age),
    className: suggestClass(age),
  };
}

export function createSeedRecords(now = Date.now()): ChildRecord[] {
  return ROWS.map((row, index) => {
    const draft = draftFromSeed(row);
    return {
      id: `seed-${String(index + 1).padStart(2, "0")}`,
      stt: index + 1,
      ...draft,
      createdAt: now - (ROWS.length - index) * 86_400_000,
      updatedAt: now - (ROWS.length - index) * 86_400_000,
    };
  });
}
