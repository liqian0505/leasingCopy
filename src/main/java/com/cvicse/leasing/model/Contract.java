package com.cvicse.leasing.model;

import org.springframework.data.annotation.Id;

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

}