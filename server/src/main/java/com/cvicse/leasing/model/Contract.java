package com.cvicse.leasing.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@Document(collection = "Contract")
public class Contract {

    @Id
    public String id;

    public String name;

    public Contract() {
    }

    public Contract(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return String.format("Contract[id=%s, name='%s']", id, name);
    }

    public String getName() {
        return name;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }
}