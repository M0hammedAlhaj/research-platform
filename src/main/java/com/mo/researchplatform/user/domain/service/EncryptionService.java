package com.mo.researchplatform.user.domain.service;

public interface EncryptionService {

    String encryptPassword(String password);

    boolean matchPassword(String password, String encryptedPassword);
}
