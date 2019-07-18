package com.cvicse.leasing.model;


import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;


@Data
public class Template {

    @Id
    private String id;

    public String name;

    public String editorContent;

    public String schemaContent;

    public ArrayList<String> contractIdList = new ArrayList<>();

    public Template() {
    }

    public Template(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return String.format("Template[id=%s, name='%s',editorContent='%s'，schemaContent='%s']", id, name,editorContent,schemaContent);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setEditorContent(String editorContent) {
        this.editorContent = editorContent;
    }

    public void setSchemaContent(String schemaContent) {
        this.schemaContent = schemaContent;
    }

    public ArrayList<String> getContractIdList() {
        return contractIdList;
    }


}