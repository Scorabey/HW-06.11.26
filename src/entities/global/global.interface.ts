export interface Identifiable {
    readonly id: string;
}

export type AcademicTitle = "Assistant" | "AssociateProfessor" | "Professor";

export interface Grade {
    readonly courseId: string;
    readonly score: number;
    readonly date: Date;
}

export interface Name {
    firstName: string;
    middleName?: string;
    lastName: string;
}