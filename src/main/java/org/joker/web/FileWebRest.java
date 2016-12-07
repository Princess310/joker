package org.joker.web;

import com.britesnow.snow.web.HttpWriter;
import com.britesnow.snow.web.HttpWriterOptions;
import com.britesnow.snow.web.RequestContext;
import com.britesnow.snow.web.handler.annotation.WebResourceHandler;
import com.britesnow.snow.web.param.annotation.WebParam;
import com.britesnow.snow.web.param.annotation.WebUser;
import com.britesnow.snow.web.rest.annotation.WebPost;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import org.apache.commons.fileupload.FileItem;
import org.joker.dao.IDao;
import org.joker.entity.Attachment;
import org.joker.entity.User;
import org.joker.perf.annotation.ToMonitor;
import org.joker.service.FileService;

import java.io.IOException;

@ToMonitor
@Singleton
public class FileWebRest {
    @Inject
    private WebResponseBuilder webResponseBuilder;

    @Inject
    private FileService fileService;

    @Inject
    private IDao<Attachment, Long> attachmentDao;

    @Inject
    private HttpWriter httpWriter;

    @WebPost("/uploadFile")
    public WebResponse uploadFile(@WebUser User user, @WebParam("file") FileItem fileItem, @WebParam("test") String test){
        Attachment attachment = null;
        System.out.println(fileItem);
        try {
            attachment = fileService.upload(user, fileItem.getInputStream(), fileItem.getName());
        } catch (IOException e) {
            e.printStackTrace();
            return webResponseBuilder.fail(e);
        }
        return webResponseBuilder.success(attachment);
    }

    @WebResourceHandler(matches="/attachment")
    public void downloadFile(@WebUser User user, @WebParam("id") Long attachmentId, RequestContext rc){
        Attachment attachment = attachmentDao.get(user, attachmentId).orElse(null);
        String fileName = attachment.getName() + "." + attachment.getExt();
        try {
            HttpWriterOptions options = new HttpWriterOptions();
            options.setContentType(getContentType(attachment.getExt()));
            httpWriter.setHeaders(rc, fileName, true, options);
            rc.getRes().addHeader("Content-Disposition", "attachment;filename=" + new String(fileName.getBytes()));
            fileService.download(rc.getRes().getOutputStream(), attachment);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String getContentType(String ext){
        if(ext != null){
            if(ext.equalsIgnoreCase(".png")){
                return "image/png";
            }else if(ext.equalsIgnoreCase(".jpg") || ext.equalsIgnoreCase(".jpeg")){
                return "image/jpeg";
            }else if(ext.equalsIgnoreCase(".bmp")){
                return "image/bmp";
            }
        }
        return "application/octet-stream";
    }
}
