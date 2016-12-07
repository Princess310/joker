package org.joker.service;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.google.inject.name.Named;
import org.joker.dao.IDao;
import org.joker.entity.Attachment;
import org.joker.entity.User;
import org.joker.util.LocalDateUtils;

import java.io.*;
import java.time.LocalDate;

@Singleton
public class FileService {

    @Named("attachments.path")
    @Inject
    private String attachmentsPath;

    @Inject
    private IDao<Attachment, Long> attachmentDao;

    public Attachment upload(User user, InputStream is, String name) {
        Attachment attachment = createNewFile(name);
        Long attatchmentId = attachmentDao.create(user, attachment);
        attachment.setId(attatchmentId);

        try {
            File file = new File(getPath(attachment));
            FileOutputStream os = new FileOutputStream(file);
            byte[] buffer = new byte[10240];
            int bytesRead = 0;
            while ((bytesRead = is.read(buffer)) > 0) {
                os.write(buffer, 0, bytesRead);
            }
            os.flush();
            os.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (is != null) {
                try {
                    is.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        return attachment;
    }

    public void download(OutputStream os, Attachment attachment){
        FileInputStream is = null;
        try {
            is = new FileInputStream(new File(getPath(attachment)));
            byte[] buf = new byte[1024];
            int ch = -1;
            while ((ch = is.read(buf)) != -1) {
                os.write(buf, 0, ch);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (os != null) {
                    os.flush();
                    os.close();
                }
                if (is != null) {
                    is.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }


    public File getFile(User user, Attachment attachment) {
        File file = new File(getPath(attachment));
        if(file.exists()){
            return file;
        }
        return null;
    }

    public void delete(User user, Attachment attachment){
        File file = new File(getPath(attachment));
        if(file.exists()){
            file.delete();
        }
        attachmentDao.delete(user, attachment.getId());
    }

    private Attachment createNewFile(String fileName){
        Attachment attachment = new Attachment();
        int extStart = fileName.lastIndexOf(".");
        String ext = null;
        String name = fileName;
        if(extStart != -1){
            ext = fileName.substring(extStart + 1);
            name = fileName.substring(0, extStart);
        }
        attachment.setExt(ext);
        attachment.setName(name);
        attachment.setPath(generatePath() + LocalDateUtils.formatDateTimeString(LocalDateUtils.newTime(), "HH_mm_ss_SSS") + "." + ext);
        return attachment;
    }

    private String generatePath(){
        LocalDate localDate = LocalDateUtils.newDate();
        StringBuilder path = new StringBuilder();
        path.append(localDate.getYear());
        path.append(File.separator);
        path.append(localDate.getMonthValue());
        path.append(File.separator);
        path.append(localDate.getDayOfMonth());
        path.append(File.separator);

        File file = new File(attachmentsPath + File.separator + path);
        file.mkdirs();
        return path.toString();
    }

    private String getPath(Attachment attachment){
        return attachmentsPath + File.separator + attachment.getPath();
    }
}