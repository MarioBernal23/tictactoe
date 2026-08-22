package com.example.backend.converter;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class BoardConverter implements AttributeConverter<Character[], String> {

    @Override
    public String convertToDatabaseColumn(Character[] attribute) {
        StringBuilder result = new StringBuilder();

        for (Character cell : attribute) {
            if (cell == null) {
                result.append('-');
            } else {
                result.append(cell);
            }
        }

        return result.toString();
    }

    @Override
    public Character[] convertToEntityAttribute(String dbData) {
        Character[] cells = new Character[dbData.length()];

        for (int i = 0; i < dbData.length(); i++) {

            if (dbData.charAt(i) == '-') {
                cells[i] = null;
            } else {
                cells[i] = dbData.charAt(i);
            }
        }

        return cells;
    }
}
